import axios from "axios";

interface SendVerificationEmailResponse {
  email: string;
  username: string;
  token: string;
}

export const sendVerificationEmail = async ({
  email,
  username,
  token,
}: SendVerificationEmailResponse) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/send-email`,
      {
        email,
        username,
        token,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al enviar el email de verificación");
  }
};
