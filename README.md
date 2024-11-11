# Farcaster Captcha Faucet Voting

# Instalación y Uso

## Clonar el Repositorio
```sh
git clone https://github.com/tu-repo/farcaster-captcha-faucet-voting.git
cd farcaster-captcha-faucet-voting 
```
## Instalar Dependencias
```sh
npm install
```
## Configurar Truffle
Añadir tu mnemotécnico en un .env para que truffle-config.js este configurado.

## Desplegar Contrato
```sh
truffle migrate --network amoy
```

Iniciar la Aplicación
```sh
npm start
```

# Farcaster Captcha Faucet Voting

## Introducción
El proyecto "Farcaster Captcha Faucet Voting" combina un sistema de faucet de tokens y un sistema de votación seguro y anónimo. Este proyecto está diseñado para la red de prueba Polygon PoS (Mumbai) y utiliza Farcaster para la integración con las redes sociales descentralizadas, además de GotCHA CAPTCHA para la verificación de usuarios.

## Objetivos Principales
1. **Token Faucet**: Proveer tokens de prueba en la red Polygon PoS (Mumbai) para los usuarios de manera controlada y segura.
2. **Votaciones Seguras y Anónimas**: Implementar un sistema de votaciones donde los usuarios puedan votar de manera segura y anónima sobre diversos temas.
3. **Protección CAPTCHA**: Integrar GotCHA CAPTCHA para garantizar que solo los usuarios humanos puedan interactuar con el sistema, evitando la interferencia de bots.

## Componentes Clave del Proyecto
1. **Contrato Inteligente para Token Faucet**
   - Funcionalidad para distribuir tokens a los usuarios.
   - Implementar restricciones para evitar abusos (por ejemplo, límites de tiempo entre solicitudes).

2. **Sistema de Votación**
   - Crear y gestionar encuestas.
   - Permitir a los usuarios votar de manera segura y anónima.
   - Almacenar los resultados de las votaciones de forma transparente.

3. **Integración del CAPTCHA**
   - Utilizar GotCHA CAPTCHA para generar y validar CAPTCHAs, asegurando que solo usuarios humanos interactúen con el sistema.

4. **Interfaz de Usuario**
   - Utilizar Farcaster Framework para crear una aplicación web integrada en la plataforma de Farcaster.
   - Proveer una interfaz amigable y fácil de usar para los usuarios.

## Flujo de Trabajo
1. **Desarrollo del Contrato Inteligente**: Crear y desplegar contratos en la red Polygon PoS para gestionar el faucet de tokens y las votaciones.
2. **Configuración del CAPTCHA**: Integrar GotCHA CAPTCHA en la aplicación web para proteger las solicitudes de tokens y el proceso de votación.
3. **Desarrollo de la Aplicación Web**: Crear una interfaz de usuario que permita a los usuarios solicitar tokens, participar en votaciones y verificar mediante CAPTCHA.
4. **Integración con Farcaster**: Utilizar las APIs y herramientas de Farcaster para integrar la aplicación en su plataforma.

## Componentes Técnicos y Herramientas Utilizadas
- **Solidity**: Lenguaje de programación para escribir contratos inteligentes.
- **React.js**: Biblioteca de JavaScript para construir la interfaz de usuario.
- **Truffle**: Entorno de desarrollo para contratos inteligentes.
- **Ganache**: Simulador de blockchain para pruebas locales.
- **Web3.js**: Biblioteca para interactuar con la blockchain desde el frontend.
- **GotCHA CAPTCHA**: Sistema CAPTCHA para verificación de usuarios humanos.
- **Farcaster API**: APIs para integrar la aplicación con la plataforma Farcaster.

## Estructura del Proyecto
```plaintext
Farcaster-Captcha-Faucet-Voting/
├── contracts/
│   ├── TokenFaucet.sol         # Contrato inteligente para el faucet de tokens
│   └── VotingSystem.sol        # Contrato inteligente para el sistema de votación
├── migrations/
│   ├── 1_initial_migration.js  # Migración inicial de Truffle
│   ├── 2_deploy_contracts.js   # Script de despliegue para TokenFaucet
│   └── 3_deploy_voting.js      # Script de despliegue para VotingSystem
├── src/
│   ├── components/
│   │   ├── Faucet.js           # Componente de React para el faucet de tokens
│   │   └── Voting.js           # Componente de React para el sistema de votación
│   ├── App.js                  # Componente principal de la aplicación
│   ├── index.js                # Punto de entrada de la aplicación React
│   ├── styles.css              # Archivo de estilos CSS para la aplicación
│   └── abis/
│       ├── TokenFaucet.json    # ABI del contrato TokenFaucet
│       └── VotingSystem.json   # ABI del contrato VotingSystem
├── public/
│   ├── index.html              # Archivo HTML principal
│   └── captcha.html            # Archivo HTML para la verificación de CAPTCHA
│   └── captcha.js              # Lógica de verificación de CAPTCHA
├── test/
│   ├── test_faucet.js          # Pruebas para el contrato del faucet de tokens
│   └── test_voting.js          # Pruebas para el contrato del sistema de votación
├── .env                        # Variables de entorno para configuraciones sensibles
├── package.json                # Archivo de configuración del proyecto Node.js
├── truffle-config.js           # Archivo de configuración de Truffle para la red Polygon
└── README.md                   # Archivo de documentación del proyecto
