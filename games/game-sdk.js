const GameSDK = {

    gameId: null,
    playerName: null,
    finished: false,

    supabaseUrl:
        "https://ypjmkigvghybkwyxndcz.supabase.co",

    anonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYXNlIiwicmVmIjoieXBqbWtpZ3ZnaHlia3d5eG5kY3oiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4NDExNzU1OCwiZXhwIjoyMDk5NjkzNTU4fQ.lJ5RddKmDdPfLecBsqL9XMGejL9Owbv1ZH2PXSqqdv4",


    init(gameId) {

        this.gameId =
            Number(gameId);

        try {

            const player =
                JSON.parse(
                    sessionStorage.getItem(
                        "publicGamePlayer"
                    )
                );

            this.playerName =
                player?.name?.trim() ||
                "مهمان";

        } catch {

            this.playerName =
                "مهمان";
        }


        return {
            gameId:
                this.gameId,

            playerName:
                this.playerName
        };
    },


    getPlayerName() {

        return this.playerName;
    },


    async finishGame(score) {

        if (this.finished) {

            return {
                success: false,
                message:
                    "امتیاز این بازی قبلاً ثبت شده است."
            };
        }


        const finalScore =
            Math.max(
                0,
                Math.min(
                    100,
                    Math.round(
                        Number(score) || 0
                    )
                )
            );


        try {

            const response =
                await fetch(
                    `${this.supabaseUrl}/functions/v1/submit-game-score`,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            "apikey":
                                this.anonKey,

                            "Authorization":
                                `Bearer ${this.anonKey}`
                        },

                        body:
                            JSON.stringify({
                                gameId:
                                    this.gameId,

                                playerName:
                                    this.playerName,

                                score:
                                    finalScore
                            })
                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.message ||
                    "ثبت امتیاز انجام نشد."
                );
            }


            this.finished = true;


            return {
                success: true,
                score: finalScore
            };


        } catch (error) {

            console.error(
                "Submit score error:",
                error
            );


            return {
                success: false,

                message:
                    error?.message ||
                    "ثبت امتیاز انجام نشد."
            };
        }
    },


    async getLeaderboard(
        limit = 10
    ) {

        try {

            /*
             * عمداً limit را در درخواست
             * Supabase قرار نمی‌دهیم.
             *
             * ابتدا رکوردها بر اساس بیشترین
             * امتیاز مرتب می‌شوند؛ سپس بهترین
             * رکورد هر بازیکن انتخاب می‌شود.
             */

            const url =
                `${this.supabaseUrl}/rest/v1/game_scores` +
                `?game_id=eq.${this.gameId}` +
                `&select=player_name,score,created_at` +
                `&order=score.desc,created_at.asc`;


            const response =
                await fetch(
                    url,
                    {
                        headers: {

                            "apikey":
                                this.anonKey,

                            "Authorization":
                                `Bearer ${this.anonKey}`
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "دریافت جدول برترین‌ها ناموفق بود."
                );
            }


            const scores =
                await response.json();


            const bestPlayers =
                new Map();


            for (
                const item of scores
            ) {

                const name =
                    String(
                        item.player_name ||
                        ""
                    ).trim();


                if (!name) {
                    continue;
                }


                /*
                 * تفاوت حروف بزرگ/کوچک
                 * باعث ایجاد بازیکن تکراری نشود.
                 */
                const key =
                    name.toLocaleLowerCase(
                        "fa"
                    );


                /*
                 * چون نتایج از بیشترین امتیاز
                 * مرتب شده‌اند، اولین رکورد
                 * بهترین رکورد این بازیکن است.
                 */
                if (
                    !bestPlayers.has(key)
                ) {

                    bestPlayers.set(
                        key,
                        {
                            player_name:
                                name,

                            score:
                                Number(
                                    item.score
                                ),

                            created_at:
                                item.created_at
                        }
                    );
                }
            }


            return Array
                .from(
                    bestPlayers.values()
                )
                .slice(
                    0,
                    Number(limit) || 10
                );


        } catch (error) {

            console.error(
                "Leaderboard error:",
                error
            );


            return [];
        }
    },


    reset() {

        this.finished = false;
    }
};


window.GameSDK = GameSDK;
