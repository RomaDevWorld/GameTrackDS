# Game Tracker Bot - the one who tracks.

# This bot is online now. You can try it if you want to 

<div>
  <a class="button" href="https://discord.com/api/oauth2/authorize?client_id=1030546888367288320&permissions=3072&scope=bot">
    <div class="text">
      CLICK HERE TO ADD
    </div>
  </a>
</div>

<style>
  .button {
    display: flex;
    justify-content: center;
    font-size: 25px;
    text-decoration: none;
    color: black;
  }
  .text {
    background-color: darkgrey;
    padding: 5px; 
    border-radius: 10px;
    transition: background-color, color 0.3s ease-in-out;
  }
  .text:hover{
      background-color: grey;
      color: white;
    }
  .button:hover{
      text-decoration: none;
      color: white;
  }
</style>

## How to use?
As soon as you add this bot to your server, it will see what games members are playing. If member close the game, bot will see it, and create a new record in database.

## How can I see what bot collected?
To view statistics for a specific user or yourself use slash command `/user`

To do the same for an entire server use `/server`

## Want to delete every record about yourself at Database?
You can use `/flush`

**Be careful, this action cannot be reversed**


# Want to contribute? Help localize this bot to a different languages.

Currently our bot has 2 languages: English and Ukrainian

Clone this repository using `git clone git@github.com:RomaDevWorld/DJS-TS.git`, make some changes in `/src/functions/getLocale.ts`, then commit and push your changes with `git commit -a -m "Change: Localization"`

Finnaly, push your changes with `git push`

### NOTE: We will decline any offer of adding Russian language to our project.