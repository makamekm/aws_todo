const { FuseBox, SassPlugin, CSSPlugin, CSSResourcePlugin } = require("fuse-box");

const typescriptRunner = FuseBox
    .init({
        homeDir: "./src",
        target: "browser@es5",
        sourceMaps: true,
        output: "public/$name.js",
        plugins: [],
        useTypescriptCompiler: true,
    });

typescriptRunner
    .bundle("index")
    .instructions("> client/index.ts")
    .watch();

typescriptRunner
    .run();

const stylesheetRunner = FuseBox
    .init({
        homeDir: "./src",
        target: "browser@es5",
        sourceMaps: false,
        output: "public/$name.js",
        writeBundles: false,
        plugins: [
            [
                /.+\.(css|scss|sass)/,
                SassPlugin({
                    importer: true,
                    includePaths: [
                        "./node_modules/",
                    ],
                    sourceMap: null,
                    sourceMaps: null,
                    outFile: "",
                }),
                CSSResourcePlugin({
                    inline: true,
                    sourceMap: false,
                    sourceMaps: false,
                }),
                CSSPlugin({
                    group: "index.css",
                    outFile: "public/index.css",
                    sourceMap: false,
                    sourceMaps: false,
                }),
            ],
        ],
    });

stylesheetRunner
    .bundle("stylesheet")
    .instructions("> **/*.entry.{scss,css,sass}")
    .watch();

stylesheetRunner
    .run();
