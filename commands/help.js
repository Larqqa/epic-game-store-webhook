const allCommands = [
  ' help',
  ' free [all | next]'
];

module.exports.run = async (client, message, args) => {
  const embedHelp = {
    author: {
      name: 'epicBot',
    },
    fields: [
      allCommands.map(command => ({ name: command, value: command, inline: true }),
      )
    ],
  };

  await message.channel.send({ embed: embedHelp });
};