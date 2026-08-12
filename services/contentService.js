import { supabase } from "../config.js";

export async function getContents(grade, chapter) {

    const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("grade", grade)
        .eq("chapter", chapter)
        .order("order_no");

    if (error) {
        console.error("Get contents error:", error);
        return [];
    }

    return data;
}


export async function getGames() {

    const { data, error } = await supabase
        .from("contents")
        .select("*")
        .eq("type", "game")
        .order("grade")
        .order("chapter")
        .order("order_no");

    if (error) {

        console.error("Get games error:", error);

        return [];
    }

    return data;
}


export async function createGame({
    title,
    grade,
    chapter,
    url,
    orderNo
}) {

    const { data, error } = await supabase
        .from("contents")
        .insert({
            title,
            grade: Number(grade),
            chapter: Number(chapter),
            type: "game",
            url,
            order_no: Number(orderNo)
        })
        .select()
        .single();

    if (error) {

        console.error("Create game error:", error);

        return {
            success: false,
            message: "ثبت بازی انجام نشد."
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

    const { data, error } = await supabase
        .from("contents")
        .update({
            title,
            grade: Number(grade),
            chapter: Number(chapter),
            url,
            order_no: Number(orderNo)
        })
        .eq("id", gameId)
        .eq("type", "game")
        .select()
        .single();

    if (error) {

        console.error("Update game error:", error);

        return {
            success: false,
            message: "ویرایش بازی انجام نشد."
        };
    }

    return {
        success: true,
        game: data
    };
}


export async function deleteGame(gameId) {

    const { error } = await supabase
        .from("contents")
        .delete()
        .eq("id", gameId)
        .eq("type", "game");

    if (error) {

        console.error("Delete game error:", error);

        return {
            success: false,
            message: "حذف بازی انجام نشد."
        };
    }

    return {
        success: true
    };
}
