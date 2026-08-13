import { supabase } from "../config.js";


export async function getContents(
    grade,
    chapter
) {

    const { data, error } =
        await supabase
            .from("contents")
            .select("*")
            .eq("grade", grade)
            .eq("chapter", chapter)
            .order("order_no");


    if (error) {

        console.error(
            "Get contents error:",
            error
        );

        return [];
    }


    return data || [];
}


export async function getGames() {

    const { data, error } =
        await supabase
            .from("contents")
            .select("*")
            .eq("type", "game")
            .order("grade")
            .order("chapter")
            .order("order_no");


    if (error) {

        console.error(
            "Get games error:",
            error
        );

        return [];
    }


    return data || [];
}


export async function createGame({
    title,
    grade,
    chapter,
    url,
    orderNo
}) {

    const { data, error } =
        await supabase
            .from("contents")
            .insert({
                title,
                grade:
                    Number(grade),
                chapter:
                    Number(chapter),
                type:
                    "game",
                url,
                order_no:
                    Number(orderNo)
            })
            .select()
            .single();


    if (error) {

        console.error(
            "Create game error:",
            error
        );

        return {
            success: false,
            message:
                "ثبت بازی انجام نشد."
        };
    }


    return {
        success: true,
        game: data
    };
}


export async function updateGame(
    gameId,
    {
        title,
        grade,
        chapter,
        url,
        orderNo
    }
) {

    const { data, error } =
        await supabase
            .from("contents")
            .update({
                title,
                grade:
                    Number(grade),
                chapter:
                    Number(chapter),
                url,
                order_no:
                    Number(orderNo)
            })
            .eq(
                "id",
                Number(gameId)
            )
            .eq(
                "type",
                "game"
            )
            .select()
            .single();


    if (error) {

        console.error(
            "Update game error:",
            error
        );

        return {
            success: false,
            message:
                "ویرایش بازی انجام نشد."
        };
    }


    return {
        success: true,
        game: data
    };
}


export async function deleteGame(
    gameId
) {

    const { error } =
        await supabase
            .from("contents")
            .delete()
            .eq(
                "id",
                Number(gameId)
            )
            .eq(
                "type",
                "game"
            );


    if (error) {

        console.error(
            "Delete game error:",
            error
        );

        return {
            success: false,
            message:
                "حذف بازی انجام نشد."
        };
    }


    return {
        success: true
    };
}


export async function getPublicGames(
    grade,
    chapter
) {

    const { data, error } =
        await supabase
            .from("contents")
            .select(
                "id, title, grade, chapter, url, order_no"
            )
            .eq(
                "type",
                "game"
            )
            .eq(
                "grade",
                Number(grade)
            )
            .eq(
                "chapter",
                Number(chapter)
            )
            .order(
                "order_no",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Get public games error:",
            error
        );

        return [];
    }


    return data || [];
}


export async function publishGame({
    title,
    grade,
    chapter,
    orderNo,
    file
}) {

    try {

        if (!file) {

            return {
                success: false,
                message:
                    "فایل بازی انتخاب نشده است."
            };
        }


        if (
            !file.name
                .toLowerCase()
                .endsWith(".html")
        ) {

            return {
                success: false,
                message:
                    "فقط فایل HTML قابل قبول است."
            };
        }


        const html =
            await file.text();


        const { data, error } =
            await supabase
                .functions
                .invoke(
                    "publish-game",
                    {
                        body: {
                            action:
                                "create",

                            title,

                            grade:
                                Number(grade),

                            chapter:
                                Number(chapter),

                            orderNo:
                                Number(orderNo),

                            fileName:
                                file.name,

                            html
                        }
                    }
                );


        if (error) {

            console.error(
                "Publish game error:",
                error
            );


            return {
                success: false,
                message:
                    "انتشار بازی انجام نشد."
            };
        }


        if (!data?.success) {

            return {
                success: false,

                message:
                    data?.message ||
                    "انتشار بازی انجام نشد."
            };
        }


        return {
            success: true,
            game:
                data.game
        };


    } catch (error) {

        console.error(
            "Publish game error:",
            error
        );


        return {
            success: false,

            message:
                "خطا در خواندن یا انتشار فایل بازی."
        };
    }
}


/*
 * جایگزینی فایل HTML یک بازی موجود
 *
 * ID بازی و URL آن تغییر نمی‌کند.
 */
export async function replaceGameFile({
    gameId,
    file
}) {

    try {

        if (
            !gameId ||
            Number(gameId) < 1
        ) {

            return {
                success: false,
                message:
                    "شناسه بازی نامعتبر است."
            };
        }


        if (!file) {

            return {
                success: false,
                message:
                    "فایل جدید بازی را انتخاب کنید."
            };
        }


        if (
            !file.name
                .toLowerCase()
                .endsWith(".html")
        ) {

            return {
                success: false,
                message:
                    "فقط فایل HTML قابل قبول است."
            };
        }


        const html =
            await file.text();


        const { data, error } =
            await supabase
                .functions
                .invoke(
                    "publish-game",
                    {
                        body: {

                            action:
                                "update-file",

                            gameId:
                                Number(gameId),

                            html
                        }
                    }
                );


        if (error) {

            console.error(
                "Replace game file error:",
                error
            );


            return {
                success: false,
                message:
                    "جایگزینی فایل بازی انجام نشد."
            };
        }


        if (!data?.success) {

            return {
                success: false,

                message:
                    data?.message ||
                    "جایگزینی فایل بازی انجام نشد."
            };
        }


        return {
            success: true,
            gameId:
                Number(gameId)
        };


    } catch (error) {

        console.error(
            "Replace game file error:",
            error
        );


        return {
            success: false,

            message:
                "خطا در خواندن یا جایگزینی فایل بازی."
        };
    }
}
