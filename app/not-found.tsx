import { Flex, Heading, Text, Em } from "@radix-ui/themes";

export default function NotFound() {
    return (
        <Flex direction="column" justify="center" align="center" gap="4">
            <Heading>
                <Flex direction="column" justify="center" align="center" gap="2">
                    <Em>
                        <Text size="9" weight="bold">
                            404
                        </Text>
                    </Em>
                    <Em>
                        <Text color="gray" weight="light">
                            Not Found
                        </Text>
                    </Em>
                </Flex>
            </Heading>

            <Text>
                La página que estás buscando no existe o ha sido movida. Por favor, verifica la URL e inténtalo de nuevo.
            </Text>

            <Text color="gray" size="1">
                Si crees que esto es un error, por favor contacta al soporte para obtener ayuda.
            </Text>
        </Flex>
    )
}