require('dotenv').config();
const { Client, Intents, Options, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({
	makeCache: Options.cacheWithLimits({
		ApplicationCommandManager: 0, // guild.commands
		BaseGuildEmojiManager: 0, // guild.emojis
		GuildBanManager: 0, // guild.bans
		GuildInviteManager: 0, // guild.invites
		GuildManager: Infinity, // client.guilds
		GuildStickerManager: 0, // guild.stickers
		MessageManager: 0, // channel.messages
		PermissionOverwriteManager: 0, // channel.permissionOverwrites
		PresenceManager: 0, // guild.presences
		ReactionManager: 0, // message.reactions
		ReactionUserManager: 0, // reaction.users
		StageInstanceManager: 0, // guild.stageInstances
		ThreadManager: 0, // channel.threads
		ThreadMemberManager: 0, // threadchannel.members
		UserManager: 0, // client.users
		VoiceStateManager: 0 // guild.voiceStates
	}),
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	allowedMentions: { parse: ['users'], repliedUser: true },
});

client.on('ready', () => {
	console.log('Ready to bite');
});

client.on('messageCreate', (message) => {
	if (message.content === 's!button' && message.author.id === process.env.OWNER) {
		message.delete();
		const embed = new MessageEmbed()
			.setImage('https://media.discordapp.net/attachments/942110216714088549/942110294782656572/sif.gif')
			.setDescription('**:flag_us:Wait! You must click button to pass !\n\n:flag_tr:Bekle! Geçmek için butona bas !**\n\n[GIF Source](https://zedotagger.tumblr.com/post/95238035245/more-dark-souls-stuff-ill-probably-end-up-doing)')
			.setColor('GREEN');
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('pass')
					.setLabel('Join')
					.setEmoji('🐺')
					.setStyle('PRIMARY'),
			);
		message.channel.send({ embeds: [embed], components: [row] });
	}
});

client.on('interactionCreate', async (i) => {
	if (!i.isButton()) return;
	if (i.customId !== 'pass') return;
	await i.deferUpdate();
	if (i.locale == process.env.DIFF_LANG) {
		i.member.roles.add(process.env.DIFF_ROLE)
	}
	else {
		i.member.roles.add(process.env.EN_ROLE)
	}
});


client.on('warn', error => console.log(error));
client.on('error', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));


client.login(process.env.TOKEN);