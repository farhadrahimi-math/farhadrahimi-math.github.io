import { restoreSession } from "./startup.js";
import { router } from "../router/router.js";

export async function bootstrap() {

    await restoreSession();

    await router();

}
