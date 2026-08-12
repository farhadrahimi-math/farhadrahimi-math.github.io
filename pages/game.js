import { grades } from "../config/chapters.js";
import { navigate } from "../utils/navigation.js";

export function renderGame() {

    const content = `

        <div class="public-games-page">

            <section class="games-intro">

                <div class="games-logo">
                    🎮
                </div>

                <h1>
                    بازی‌های ریاضی
                </h1>

                <h2>
                    فرهاد رحیمی
                </h2>

                <p>
                    دبیر ریاضی
                </p>

                <p class="games-description">
                    یادگیری ریاضی با بازی، تمرین و رقابت
                </p>

            </section>


            <section class="player-section">

                <h2>
                    👋 آماده‌ای بازی کنیم؟
                </h2>

                <div class="input-group">

                    <label for="playerName">
                        اسم بازیکن
                    </label>

                    <input
                        id="playerName"
                        type="text"
                        maxlength="30"
                        placeholder="اسمت رو وارد کن"
                        autocomplete="off">

                </div>

            </section>


            <section class="grade-section">

                <h2>
                    پایه خودت رو انتخاب کن
                </h2>

                <div class="grade-list">

                    ${Object.entries(grades)
                        .map(
                            ([grade, info]) => `

                                <button
                                    type="button"
                                    class="grade-game-btn"
                                    data-grade="${grade}"
                                    style="
                                        --grade-color:
                                        ${info.color};
                                    ">

                                    <span>
                                        پایه
                                    </span>

                                    <strong>
                                        ${grade}
                                    </strong>

                                    <small>
                                        ${info.title}
                                    </small>

                                </button>

                            `
                        )
                        .join("")}

                </div>

            </section>


            <section
                id="gamesMessage"
                class="games-message">
            </section>


            <button
                id="backToLoginBtn"
                type="button"
                class="games-back-btn">

                ورود به سامانه دانش‌آموزی

            </button>

        </div>

    `;

    document.getElementById("app").innerHTML =
        content;

    bindGamePageEvents();
}


function bindGamePageEvents() {

    document
        .querySelectorAll(".grade-game-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const playerName =
                        document
                            .getElementById(
                                "playerName"
                            )
                            ?.value
                            .trim();

                    if (!playerName) {

                        showMessage(
                            "اول اسمت رو وارد کن 🌟"
                        );

                        document
                            .getElementById(
                                "playerName"
                            )
                            ?.focus();

                        return;
                    }

                    const grade =
                        Number(
                            button.dataset.grade
                        );

                    savePublicPlayer({
                        name: playerName,
                        grade
                    });

                    /*
                     * در مرحله بعد اینجا
                     * فصل‌های پایه انتخاب‌شده
                     * نمایش داده می‌شوند.
                     */

                    showMessage(
                        `پایه ${grade} انتخاب شد ✅`
                    );
                }
            );

        });


    document
        .getElementById("backToLoginBtn")
        ?.addEventListener(
            "click",
            () => {

                navigate("login");

            }
        );
}


function savePublicPlayer({
    name,
    grade
}) {

    sessionStorage.setItem(
        "publicGamePlayer",
        JSON.stringify({
            name,
            grade
        })
    );
}


function showMessage(message) {

    const element =
        document.getElementById(
            "gamesMessage"
        );

    if (!element) return;

    element.textContent = message;
}
