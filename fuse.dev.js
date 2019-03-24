const { FuseBox, SassPlugin, CSSPlugin, CSSResourcePlugin } = require("fuse-box");

const typescriptRunner = FuseBox
    .init({
        homeDir: "./src",
        target: "browser@es5",
        sourceMaps: {
            inline: true,
        },
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
                    omitSourceMapUrl: false,
                    outFile: "",
                    sourceMap: false,
                    sourceComments: false,
                }),
                CSSResourcePlugin({
                    inline: true,
                }),
                CSSPlugin({
                    inject: false,
                    group: "index.css",
                    outFile: "public/index.css",
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
