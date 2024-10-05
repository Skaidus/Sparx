const express = require('express');
const {prometheusHost, prometheusPort} = require("./config.json")

const server = express();

const Prometheus = require('prom-client');
const register = new Prometheus.Registry();

const metricCommandCalls = new Prometheus.Counter({
	name: "command_calls",									
	help: "Times that a command was called",
    labelNames: ['methodName'],
});

register.registerMetric(metricCommandCalls);

server.get('/metrics', async (req, res) => {
    res.send(await register.metrics());
});

server.listen(prometheusPort, () => {
    console.log(`Prometheus server is up at port ${prometheusPort}`);
})

module.exports = {
    metricCmdCalls: metricCommandCalls,
}