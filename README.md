Git Glitched
============

Deploy to Glitch with a single `git push`.

Setup
-----

- Fork the Git Glitched [GitHub repo](https://github.com/noise-machines/git-glitched).
- Copy the URL of your forked repo. You'll need it in a second.
- Create a new Glitch project based on your forked repo:
  - In the top left corner of Glitch, click your project name.
  - Click New Project ✨.
  - Click Clone from Git Repo.
  - When Glitch asks what Git repo you want to clone from, enter the URL of your forked repo. (That's the one you copied a second ago.)
- In your newly created Glitch project, go to the .env.example file and follow the directions there for setting your `SECRET` environment variable.
- Open the Glitch console. As I'm writing this, you can do that by clicking `Tools` in the bottom left corner of Glitch, then clicking `Full Page Console →`.
- In the console that opens, [generate a new ssh key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#generating-a-new-ssh-key).
- When you're generating your SSH key, you'll be asked where you want to save it. You can go with the default location, but remember the file it's saved to. If you're not sure where it saved, it's probably in `~/.ssh/id_rsa.pub` or `/app/.ssh/id_rsa.pub`.
- Use the [`cat` command](https://www.interserver.net/tips/kb/linux-cat-command-usage-examples/) to print out your newly-generated public key, then copy it. You'll need it for the next step.
- [Set up that public key as a deploy key](https://developer.github.com/v3/guides/managing-deploy-keys/#deploy-keys) for your forked GitHub repo.
- In your forked repo, [set up a webhook](https://developer.github.com/webhooks/creating/) to POST to `{your-project-name}.glitch.me/deploy?secret={your-secret}`.
  - The Payload URL should be `{your-project-name}.glitch.me/deploy?secret={your-secret}`.
  - Make sure `{your-secret}` matches the `SECRET` environment variable you set earlier in your Glitch project.
  - Change the `Content type` to `application/json`.
  - You don't need to set the `Secret` field. That's a different, unrelated secret.
- [Clone your forked repo](https://help.github.com/en/articles/cloning-a-repository) to your computer.
- Change into the local copy of your repo that you just cloned.
- [Create a git branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) called `glitch`.

Now when you push to the glitch branch of your repo, it will automatically get deployed to Glitch 🎉

> ☠️ Be careful. This project only checks if the `secret` query param matches the `SECRET` environment variable. It will happily pull down any git repository, *including ones that don't belong to you*.

Made by [Thomas Bailey](https://twitter.com/noise_machines)
-----------------------

\ ゜o゜)ノ
