FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY public/ public/
COPY src/ src/
COPY styles/ styles/
COPY webpack.config.js .babelrc ./

ARG CONF_TOKEN
ENV CONF_TOKEN=${CONF_TOKEN}

ARG STAGING_TOKEN
ENV STAGING_TOKEN=${STAGING_TOKEN}

ARG QA_IN_TOKEN
ENV QA_IN_TOKEN=${QA_IN_TOKEN}

ARG FIREBASE_API_KEY
ENV FIREBASE_API_KEY=${FIREBASE_API_KEY}

ARG FIREBASE_AUTH_DOMAIN
ENV FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}

ARG FIREBASE_DATABASE_URL
ENV FIREBASE_DATABASE_URL=${FIREBASE_DATABASE_URL}

ARG FIREBASE_PROJECT_ID
ENV FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}

ARG FIREBASE_STORAGE_BUCKET
ENV FIREBASE_STORAGE_BUCKET=${FIREBASE_STORAGE_BUCKET}

ARG FIREBASE_MESSAGING_ID
ENV FIREBASE_MESSAGING_ID=${FIREBASE_MESSAGING_ID}

ARG FIREBASE_APP_ID
ENV FIREBASE_APP_ID=${FIREBASE_APP_ID}

ARG FIREBASE_MEASUREMENT_ID
ENV FIREBASE_MEASUREMENT_ID=${FIREBASE_MEASUREMENT_ID}

RUN npm run build

# Serve dist

FROM caddy:2.1.1-alpine
ENV ENABLE_TELEMETRY="false"

WORKDIR /app
COPY configs/certs/ /app/certs/
COPY --from=0 /app/dist /app/dist
