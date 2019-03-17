const glob = require("glob");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

const SERVERLESS_CONFIG_PATH =
    process.env.CONFIG_PATH || "serverless.yml";

const SERVERLESS_CONFIG_SERVICE_PATH_PATTERN =
    process.env.CONFIG_SERVICE_PATH_PATTERN || "src/**/service.yml";

const SERVERLESS_CONFIG_ENCODING =
    process.env.CONFIG_ENCODING || "utf8";

const GLOB_OPTIONS = {};

function prepareConfigFunctions(config) {
    if (!config.functions) {
        config.functions = {};
    }
}

function prepareConfigResources(config) {
    if (!config.resources) {
        config.resources = {};
    }
}

function prepareConfig(config) {
    prepareConfigFunctions(config);
    prepareConfigResources(config);
}

function cleanConfigFunctions(config) {
    if (!Object.keys(config.functions).length) {
        delete config.functions;
    }
}

function cleanConfigResources(config) {
    if (!Object.keys(config.resources).length) {
        delete config.resources;
    }
}

function cleanConfig(config) {
    cleanConfigFunctions(config);
    cleanConfigResources(config);
}

function readConfig(configPath, encoding) {
    return yaml.safeLoad(
        fs.readFileSync(
            path.resolve(
                configPath,
            ),
            encoding,
        ),
    );
}

function extendConfigFunctions(config, serviceConfig) {
    Object.assign(config.functions, serviceConfig.functions);
}

function extendConfigResources(config, serviceConfig) {
    Object.assign(config.resources, serviceConfig.resources);
}

function extendConfig(config, serviceConfig) {
    extendConfigFunctions(config, serviceConfig);
    extendConfigFunctions(config, serviceConfig);
}

function saveConfigDump(config, configPath, encoding) {
    fs.writeFileSync(
        configPath,
        yaml.safeDump(config),
        encoding,
    );
}

function collectServelessConfigFromFolders(config, files) {
    for (const file of files) {
        const serviceConfig = readConfig(file, SERVERLESS_CONFIG_ENCODING);
        extendConfig(config, serviceConfig);
    }
}

function collectServelessConfigScript(files) {
    const config = readConfig(SERVERLESS_CONFIG_PATH, SERVERLESS_CONFIG_ENCODING);
    prepareConfig(config);
    collectServelessConfigFromFolders(config, files);
    cleanConfig(config);
    saveConfigDump(config, SERVERLESS_CONFIG_PATH, SERVERLESS_CONFIG_ENCODING);
}

glob(
    SERVERLESS_CONFIG_SERVICE_PATH_PATTERN,
    GLOB_OPTIONS,
    (error, files) => {
        if (files) {
            collectServelessConfigScript(files);
        } else {
            throw error;
        }
    },
);
