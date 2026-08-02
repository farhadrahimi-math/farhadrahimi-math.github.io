export function createDrawerHeader(profile) {

    return `

        <div class="drawer-header">

            <div class="drawer-avatar">
    🏆
</div>
            <h3>

                ${profile.name}

            </h3>

            <p>

                پایه ${profile.grade}

            </p>

        </div>

    `;

}
