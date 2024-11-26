import {
  render,
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import { tw } from "./TailwindConfig";

interface VerifyEmailTemplateProps {
  email: string;
  username: string;
  token: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const VerifyEmailTemplate = ({ username, token }: VerifyEmailTemplateProps) => {
  return (
    <Html lang='es'>
      <Head />
      <Preview>
        Por favor, verifica tu correo electrónico para poder acceder a tu cuenta
        de Esisfactu.
      </Preview>
      <Body>
        <Tailwind config={tw}>
          <Container className='mx-auto my-0 pt-5 pb-12 px-0 max-w-md'>
            <Img
              src={`${baseUrl}/assets/esisfactu-icono.svg`}
              width='32'
              height='32'
              alt='Esisfactu'
            />

            <Text className='text-2xl'>
              <strong>@{username}</strong>, ¡Bienvenido a Esisfactu!
            </Text>

            <Section className='p-6 border-slate-900 border-2'>
              <Text className='mb-2 text-left'>
                Hey <strong>{username}</strong>!
              </Text>
              <Text className='mb-2 text-left'>
                Por favor, verifica tu correo electrónico para poder acceder a
                tu cuenta de Esisfactu.
              </Text>

              <Button
                href={`${baseUrl}/auth/verify-email?token=${token}`}
                className='text-sm bg-sky-700 text-white rounded-md px-3 py-6'
              >
                Verificar correo electrónico
              </Button>

              <Text className='mb-2 text-left'>
                Si no te registraste en Esisfactu, ignora este mensaje.
              </Text>
              <Text className='mb-2 text-left'>Saludos,</Text>
              <Text className='mb-2 text-left'>
                <strong>Equipo Esisfactu</strong>
              </Text>
            </Section>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

export const verifyEmailTemplate = ({
  email,
  username,
  token,
}: VerifyEmailTemplateProps) =>
  render(
    <VerifyEmailTemplate
      email={email}
      username={username}
      token={token}
    />
  );
