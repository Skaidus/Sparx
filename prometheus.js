const http = require("http");
const {prometheusHost, prometheusPort} = require("./config.json")


const Prometheus = require('prom-client');
const register = new Prometheus.Registry();

const metricCommandCalls = new Prometheus.Counter({
	name: "command_calls",									
	help: "Times that a command was called",
    labelNames: ['methodName'],
});

register.registerMetric(metricCommandCalls);

const rqListener = function (req,res) {
    if (req.url === '/metrics') {
        res.writeHead(200);
        register.metrics().then(data => res.end(data))
    }
};

const server = http.createServer(rqListener);
server.listen(prometheusPort,prometheusHost, () => {
    console.log(`Prometheus server is up at ${prometheusHost}:${prometheusPort}`);
})

module.exports = {
    metricCmdCalls: metricCommandCalls,
}