const { FuseBox, SassPlugin, CSSPlugin, CSSResourcePlugin, QuantumPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir: "./src",
    target: "browser@es5",
    output: "public/$name.js",
    plugins: [
        [
            SassPlugin({
                outputStyle: "compressed",
            }),
            CSSResourcePlugin({
                dist: "public/css-resources",
                resolve: f => `/public/css-resources/${f}`,
            }),
            CSSPlugin({
                outFile: (file, relativeRoute) => {
                    return `public/${relativeRoute}/${file}`;
                },
            }),
        ],
        QuantumPlugin({
            target: "browser",
            bakeApiIntoBundle: "index",
            uglify: true,
            containedAPI: true,
            polyfills: ["Promise"],
            css: { clean: true },
            extendServerImport: true,
        }),
    ],
    useTypescriptCompiler: true,
});

fuse
    .bundle("index")
    .instructions("> client/index.ts");

fuse.run();
