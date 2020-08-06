# Update the VARIANT arg in devcontainer.json to pick a Ruby version: 2, 2.7, 2.6, 2.5
ARG VARIANT=2
FROM ruby:${VARIANT}

# This Dockerfile adds a non-root user with sudo access. Update the “remoteUser” property in
# devcontainer.json to use it. More info: https://aka.ms/vscode-remote/containers/non-root-user.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Options for common setup script - SHA generated on release
ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="true"
ARG COMMON_SCRIPT_SOURCE="https://raw.githubusercontent.com/microsoft/vscode-dev-containers/2a5d8bbf455b3907b2f2f06bb55b065c4e485426/script-library/common-debian.sh"
ARG COMMON_SCRIPT_SHA="9b6a503f53aa12acee60fbbc6fd0be0309e4cdb289c0303b820fec0a974cd44f"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your own dependencies.
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends curl ca-certificates 2>&1 \
    && curl -sSL ${COMMON_SCRIPT_SOURCE} -o /tmp/common-setup.sh \
    && ([ "${COMMON_SCRIPT_SHA}" = "dev-mode" ] || (echo "${COMMON_SCRIPT_SHA} /tmp/common-setup.sh" | sha256sum -c -)) \
    && /bin/bash /tmp/common-setup.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install Ruby tools
RUN gem install rake ruby-debug-ide debase

# [Optional] Install Node.js for use with web applications - update the INSTALL_NODE arg in devcontainer.json to enable.
ARG INSTALL_NODE="true"
ARG NODE_VERSION="lts/*"
ARG NODE_SCRIPT_SOURCE="https://raw.githubusercontent.com/microsoft/vscode-dev-containers/2a5d8bbf455b3907b2f2f06bb55b065c4e485426/script-library/node-debian.sh"
ARG NODE_SCRIPT_SHA="dev-mode"

ENV NVM_DIR=/usr/local/share/nvm \
    NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}

RUN [ "$INSTALL_NODE" = "true" ] || exit 0; \
    curl -sSL ${NODE_SCRIPT_SOURCE} -o /tmp/node-setup.sh \
    && ([ "${NODE_SCRIPT_SHA}" = "dev-mode" ] || (echo "${NODE_SCRIPT_SHA} /tmp/node-setup.sh" | sha256sum -c -)) \
    && /bin/bash /tmp/node-setup.sh "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update \
#     && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment this line to install additional gems.
# RUN gem install <your-gem-names-here>
