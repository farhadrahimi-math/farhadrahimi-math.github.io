const GameSDK = {

    gameId: null,
    playerName: null,
    finished: false,

    init(gameId) {

        this.gameId = Number(gameId);

        try {

            const player =
                JSON.parse(
                    sessionStorage.getItem(
                        "publicGamePlayer"
                    )
                );

            this.playerName =
                player?.name || "مهمان";

        } catch {

            this.playerName = "مهمان";
        }

        return {
            gameId: this.gameId,
            playerName: this.playerName
        };
    },

    getPlayerName() {
        return this.playerName;
    },

    finishGame(score) {

        if (this.finished) {
            return;
        }

        this.finished = true;

        const finalScore = Math.max(
            0,
            Math.min(100, Number(score) || 0)
        );

        console.log("Game finished:", {
            gameId: this.gameId,
            playerName: this.playerName,
            score: finalScore
        });

        /*
         * در مرحله بعد اینجا
         * امتیاز در Supabase ثبت می‌شود.
         */
    },

    reset() {
        this.finished = false;
    }
};

window.GameSDK = GameSDK;
