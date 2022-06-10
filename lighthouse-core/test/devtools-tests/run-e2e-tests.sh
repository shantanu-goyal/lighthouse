#!/usr/bin/env bash

##
# @license Copyright 2022 The Lighthouse Authors. All Rights Reserved.
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
##

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export LH_ROOT="$SCRIPT_DIR/../../.."

# Get newest folder
latest_content_shell_dir_name=$(ls -t "$LH_ROOT/.tmp/chromium-web-tests/content-shells/" | head -n1)
latest_content_shell_dir="$LH_ROOT/.tmp/chromium-web-tests/content-shells/$latest_content_shell_dir_name/out/Release"
latest_content_shell=$(node "$LH_ROOT/third-party/download-content-shell/download-content-shell.js" --resolve-executable-path $latest_content_shell_dir)

cd "$DEVTOOLS_PATH"

git cl patch 3682120 || true

# TODO: run tests from our codebase
TEST_PATTERN="${1:-lighthouse/*}"
npm run e2etest -- --chrome-binary-path="$latest_content_shell" "$TEST_PATTERN"
