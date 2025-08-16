require('dotenv/config'); // Carga variables de entorno desde .env
const { Client, GatewayIntentBits, Partials } = require('discord.js'); // Importa clases y enums necesarios de discord.js

// Crea el cliente de Discord con los intents y partials necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,           // Permite gestionar servidores
    GatewayIntentBits.GuildMembers,     // Permite detectar miembros que entran/salen
    GatewayIntentBits.GuildMessages,    // Permite leer mensajes en servidores
    GatewayIntentBits.MessageContent,   // Permite leer el contenido de los mensajes
    GatewayIntentBits.DirectMessages    // Permite leer mensajes directos (DM)
  ],
  partials: [
    Partials.Message,   // Permite gestionar mensajes parciales
    Partials.Channel,   // Permite gestionar canales parciales
    Partials.Reaction,  // Permite gestionar reacciones parciales
    Partials.User       // Permite gestionar usuarios parciales (necesario para DMs)
  ]
});

// Evento: El bot está listo y conectado
client.on('ready', async () => {
    console.log(`el bot furula`); // Mensaje en consola al iniciar
    client.user.setStatus('online'); // Fuerza el estado del bot a "online"
});

// Evento: Mensaje recibido (en canal o DM)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignora mensajes de otros bots
    if (message.content.toLowerCase() === "test") {
        message.reply("Test successful!"); // Responde a "test"
    }
    // Comando para detener el bot, solo para el usuario con tu ID
    if (message.content.toLowerCase() === "stop" && message.author.id === '281707019789008896') {
        await message.reply("Bot detenido.");
        process.exit(0); // Detiene el proceso del bot
    }
});

// ID de los canales para bienvenida y despedida
const WELCOME_CHANNEL_ID = '429646768641146880';      // Canal de bienvenida
const GOODBYE_CHANNEL_ID = '1406013783914184754';     // Canal de despedida

// Evento: Nuevo miembro entra al servidor
client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (channel) {
        channel.send(`¡Alegraos mancos pues ${member.user.username} se une a la familia! 🎉`);
    }
});

// Evento: Miembro abandona el servidor
client.on('guildMemberRemove', async (member) => {
    const channel = member.guild.channels.cache.get(GOODBYE_CHANNEL_ID);
    if (channel) {
        channel.send(`${member.user.username} voló alto...`);
    }
});

// Muestra el token en consola para depuración
console.log('TOKEN:', process.env.TOKEN);

// Inicia sesión en Discord con el token
client.login(process.env.TOKEN)
  .catch(console.error); // Muestra errores de login en consola