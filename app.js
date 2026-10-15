let bonnieBlue = false;
var bonnieBluePositive = document.getElementById("bonnieBluePositive");
var bonnieBlueNegative = document.getElementById("bonnieBlueNegative");

function ToggleBonnieBlue()
{
    bonnieBlue = !bonnieBlue;
    bonnieBluePositive.classList.toggle("d-none", !bonnieBlue);
    bonnieBlueNegative.classList.toggle("d-none", bonnieBlue);
}

function SetMessage(message, text, colorClass)
{
    message.textContent = text;
    message.classList.remove("text-warning", "text-success", "text-danger");
    message.classList.add(colorClass);
}

function CheckInput(inputId, messageId, correctAnswer)
{
    var input = document.getElementById(inputId);
    var message = document.getElementById(messageId);
    var value = input.value.trim();

    // Only whole numbers count as integers
    if (!/^-?\d+$/.test(value))
    {
        SetMessage(message, "Please enter a whole number, not text.", "text-warning");
        return;
    }

    if (parseInt(value, 10) === correctAnswer)
    {
        SetMessage(message, "Correct!", "text-success");
    }
    else
    {
        SetMessage(message, "Wrong, try again.", "text-danger");
    }
}

function CheckAnswers()
{
    CheckInput("question1", "message1", 8);
    CheckInput("question2", "message2", 1);
}

function LoadRepos()
{
    var list = document.getElementById("repoList");

    fetch("https://api.github.com/users/Davidbesin/repos?sort=updated&per_page=10")
        .then(function (response)
        {
            if (!response.ok)
            {
                throw new Error("GitHub returned " + response.status);
            }
            return response.json();
        })
        .then(function (repos)
        {
            repos.forEach(function (repo)
            {
                var date = new Date(repo.created_at).toLocaleDateString("en-GB",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

                var description = repo.description ? repo.description : "no description yet";
                var language = repo.language ? repo.language : "an unspecified language";

                var item = document.createElement("li");
                item.className = "list-group-item";
                item.textContent = repo.name + " was created on " + date +
                    ". It is about: " + description +
                    ". The main language is " + language + ".";
                list.appendChild(item);
            });
        })
        .catch(function (error)
        {
            list.textContent = "Could not load projects right now.";
            console.error("API error:", error);
        });
}

LoadRepos();
