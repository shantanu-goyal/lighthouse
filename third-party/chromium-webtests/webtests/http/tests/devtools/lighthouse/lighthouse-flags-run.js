// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(async function() {
  TestRunner.addResult('Tests that lighthouse panel passes flags.\n');
  await TestRunner.navigatePromise('resources/lighthouse-basic.html');

  await TestRunner.loadTestModule('lighthouse_test_runner');
  await TestRunner.showPanel('lighthouse');

  const dialogElement = LighthouseTestRunner.getContainerElement();

  // Turn off simulated throttling.
  const select = dialogElement.querySelector('.lighthouse-settings-pane .toolbar')
      .shadowRoot.querySelector('select')
  select.querySelector('option[value="devtools"]').selected = true;

  // Change event is not emitted automatically when updating select element programatically.
  select.dispatchEvent(new Event('change'));

  // Use desktop environment
  dialogElement.querySelector('input[name="lighthouse.device_type"][value="desktop"]').click();

  LighthouseTestRunner.dumpStartAuditState();
  LighthouseTestRunner.getRunButton().click();

  const {lhr} = await LighthouseTestRunner.waitForResults();
  TestRunner.addResult('\n=============== Lighthouse Results ===============');
  TestRunner.addResult(`formFactor: ${lhr.configSettings.formFactor}`);
  TestRunner.addResult(`disableStorageReset: ${lhr.configSettings.disableStorageReset}`);
  TestRunner.addResult(`throttlingMethod: ${lhr.configSettings.throttlingMethod}`);

  const viewTraceButton = LighthouseTestRunner.getResultsElement().querySelector('.lh-button--trace');
  TestRunner.addResult(`\nView Trace Button Text: "${viewTraceButton.textContent}"`);
  TestRunner.addResult(`View Trace Button Title: "${viewTraceButton.title}"`);

  TestRunner.completeTest();
})();
