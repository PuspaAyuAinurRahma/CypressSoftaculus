#!/usr/bin/env bash

GITLAB_USER_NAME=deploy
GITLAB_USER_EMAIL=deploy@beon.co.id

[[ -f $(command -v semtag) ]] || exit 1

# Git config
git config --global user.email "${GITLAB_USER_EMAIL}"
git config --global user.name "${GITLAB_USER_NAME}"
GITLAB_URL=$(git config --get remote.origin.url)
GITLAB_URL=${GITLAB_URL#*@}

git remote set-url --push origin "http://${GITLAB_USER_NAME}:${GIT_DEPLOY_PASSWORD}@${GITLAB_URL}"

# Generate tag
GIT_TAG=none
case "${CI_COMMIT_MESSAGE}" in
    *"patch"*|*"fix"*|*"bugfix"* )
        if [[ "$CI_COMMIT_REF_NAME" == master ]]; then
            GIT_TAG=$(semtag final -s patch > /dev/null 2>&1)
        elif [[ "$CI_COMMIT_REF_NAME" == development* ]]; then
            GIT_TAG=$(semtag candidate -s patch > /dev/null 2>&1)
        fi
        ;;
    *"minor"*|*"feat"*|*"feature"* )
        if [[ "$CI_COMMIT_REF_NAME" == master ]]; then
            GIT_TAG=$(semtag final -s minor > /dev/null 2>&1)
        elif [[ "$CI_COMMIT_REF_NAME" == development* ]]; then
            GIT_TAG=$(semtag candidate -s minor > /dev/null 2>&1)
        fi
        ;;
    *"major"*|*"breaking change"* )
        if [[ "$CI_COMMIT_REF_NAME" == master ]]; then
            GIT_TAG=$(semtag final -s major > /dev/null 2>&1)
        elif [[ "$CI_COMMIT_REF_NAME" == development* ]]; then
            GIT_TAG=$(semtag candidate -s major > /dev/null 2>&1)
        fi
        ;;
    *) echo "Keyword not detected. Doing nothing"
        ;;
esac
