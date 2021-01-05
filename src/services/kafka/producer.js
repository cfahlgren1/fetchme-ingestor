const { Kafka } = require("kafkajs");
const kafkaConfig = require("./config");

/**
 * Receive slack object with parameters and send to kafka cluster
 * @param  {Object} message
 */
const sendMessage = async (message) => {
  try {
    // initialize kafka with configuration
    const kafka = new Kafka(kafkaConfig.config);
    const producer = kafka.producer();
    const kafkaMessage = JSON.stringify(message);

    await producer.connect();
    console.log("Kafka producer connected!");
    console.log(process.env.KAFKA_USERNAME);

    console.log(kafkaConfig.topic);

    // send jsonmessage to kafka
    await producer.send({
      topic: kafkaConfig.topic,
      messages: [{ value: kafkaMessage }],
    });

    console.log(`Kafka ${kafkaMessage} sent!`);
    await producer.disconnect();
    console.log("Kafka producer disconnected!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
