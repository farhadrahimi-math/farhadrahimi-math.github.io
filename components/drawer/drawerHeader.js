export function createDrawerHeader(profile) {

    return `

        <div class="drawer-header">

            <img
                src="assets/images/logo.svg"
                class="drawer-avatar"
                alt="Logo">

            <h3>

                ${profile.name}

            </h3>

            <p>

                پایه ${profile.grade}

            </p>

        </div>

    `;

}
