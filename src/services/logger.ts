const LOG_ENDPOINT = "https://integradorwebhook.sanjaworks.com/webhook/produtor-rh-logs";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

const sendLog = async (level: LogLevel, message: string, data?: any) => {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
  };

  // Log local primeiro
  console.log(`[${level.toUpperCase()}] ${message}`, data);
  
  try {
    console.log(`Enviando log para: ${LOG_ENDPOINT}`);
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logEntry),
    });
    
    console.log(`Resposta do webhook: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erro do servidor: ${errorText}`);
    }
  } catch (error) {
    console.error("Falha ao enviar log para webhook:", error);
  }
};

export const logger = {
  debug: (message: string, data?: any) => sendLog("debug", message, data),
  info: (message: string, data?: any) => sendLog("info", message, data),
  warn: (message: string, data?: any) => sendLog("warn", message, data),
  error: (message: string, data?: any) => sendLog("error", message, data),
};
