import { createAppLayout } from "../components/appLayout.js";

export async function renderChapter() {

    document.getElementById("app").innerHTML =
        createAppLayout(

            `
                <h2>صفحه فصل</h2>
                <p>به زودی...</p>
            `,

            "فصل"

        );

}
