"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const express_prometheus_middleware_1 = __importDefault(require("express-prometheus-middleware"));
const validators_1 = require("./middlewares/validators");
const HomeController_1 = __importDefault(require("./controllers/HomeController"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_prometheus_middleware_1.default)({
    metricsPath: "/api/v1/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    /**
     * Uncomenting the `authenticate` callback will make the `metricsPath` route
     * require authentication. This authentication callback can make a simple
     * basic auth test, or even query a remote server to validate access.
     * To access /metrics you could do:
     * curl -X GET user:password@localhost:9091/metrics
     */
    // 
    authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
    /**
     * Uncommenting the `extraMasks` config will use the list of regexes to
     * reformat URL path names and replace the values found with a placeholder value
     */
    // extraMasks: [/..:..:..:..:..:../],
    /**
     * The prefix option will cause all metrics to have the given prefix.
     * E.g.: `app_prefix_http_requests_total`
     */
    // prefix: 'app_prefix_',
    /**
     * Can add custom labels with customLabels and transformLabels options
     */
    // customLabels: ['contentType'],
    // transformLabels(labels, req) {
    //   // eslint-disable-next-line no-param-reassign
    //   labels.contentType = req.headers['content-type'];
    // },
}));
//routes
app.get("/api/v1/time", validators_1.myRequestHeaders, validators_1.validateRequest, HomeController_1.default.getTime);
//server creation
const port = process.env.PORT && parseInt(process.env.PORT, 10);
app.set("port", port);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log("server running on ....." + port);
});
