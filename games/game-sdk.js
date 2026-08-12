const GameSDK = {

    gameId: null,
    playerName: null,
    finished: false,

    supabaseUrl:
        "https://ypjmkigvghybkwyxndcz.supabase.co",

    // دقیقاً همان anon key موجود در config.js
    anonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwam1raWd2Z2h5Ymt3eXhuZGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTc1NTgsImV4cCI6MjA5OTY5MzU1OH0.lJ5RddKmDdPfLecBsqL9XMGejL9Owbv1ZH2PXSqqdv4",


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
                score:
                    finalScore
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

            const response =
                await fetch(
                    `${this.supabaseUrl}/rest/v1/rpc/get_game_leaderboard`,
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

                                p_game_id:
                                    this.gameId,

                                p_limit:
                                    Number(limit) || 10
                            })
                    }
                );


            if (!response.ok) {

                const errorText =
                    await response.text();


                console.error(
                    "Leaderboard HTTP error:",
                    response.status,
                    errorText
                );


                return [];
            }


            const scores =
                await response.json();


            return Array.isArray(scores)
                ? scores
                : [];


        } catch (error) {

            console.error(
                "Leaderboard error:",
                error
            );


            return [];
        }
    },


    reset() {

        this.finished =
            false;
    }
};


window.GameSDK =
    GameSDK;
