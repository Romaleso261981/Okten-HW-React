export const sendMessage = async (message: string): Promise<void> => {
  try {
    // const URL = `${URI_API}${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text${message}`;
    const URL = `https://api.telegram.org/bot7077738581:AAEqoAWJvox6ouc6foEcZNLTNWO6N8MSaNw/sendMessage?chat_id=-1001682516809&text=${message}`;
    await fetch(URL);
  } catch (e) {
    console.log(e);
  }
};
