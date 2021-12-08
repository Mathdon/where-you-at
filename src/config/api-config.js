import path from "path";

export default () => {
    const ENV_FILE = path.join(__dirname, '.env');
    require('dotenv').config({ path: ENV_FILE });
}
