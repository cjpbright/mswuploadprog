# mswuploadprog

Reproduction repo for MSW upload progress issue.

Vite base - run 'npm install', then 'npm run dev'

Choose any file to upload then click 'Submit'

MSW interception kicks in correctly (as evidenced by console logs), but progress event subscriptions never fires. According to the XHR spec the progress event should always fire, even if only once with the entire file.
