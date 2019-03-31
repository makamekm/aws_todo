import "core-js/modules/es7.symbol.async-iterator";
import handler from "../server";

const port = process.env.PORT || 3000;

handler.listen(port, (error) => {
    if (error) {
        throw error;
    }
    // console.log(`> Ready On Server http://localhost:${port}`);
});
