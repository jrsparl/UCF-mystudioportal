async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const comment_text_element = document.querySelector('textarea[name="comment-body"]')

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            comment_text_element.value = "";
        } else {
            alert(response.statusText);
        }
    }
}

async function viewComments(event) {
    const response = await fetch('/api/comments/viewcomments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
            displaycomments(data);
        });
    } else {
        alert(response.statusText);
    }
}


var displaycomments = function(data) {
    var commentCardHolder = document.getElementById("comment-holder")
    commentCardHolder.textContent = ""
    for (var i = 0; i < data.length; i++) {
        let teacherName = data[i].teacher.user.first_name + " " + data[i].teacher.user.last_name;
        let dateCreated = data[i].createdAt
        let commentText = data[i].comment_text

        {
            /* <ul class="list-group list-group-flush">
                                    <li class="list-group-item bg-secondary">
                                    <p>Created: Created Date</p>
                                    </li>
                                    <li class="list-group-item bg-secondary">
                                    <p>Teacher: Teacher Name</p>
                                    </li>
                                    <li class="list-group-item bg-secondary">
                                    <p>Comment: a pluribus unum umbrella</p>
                                    </li>
                                </ul> */
        }



        //build the student card
        let commentCardEl = document.createElement("div");
        commentCardEl.classList = "card m-1";
        commentCardHolder.appendChild(commentCardEl);

        //build the student card
        // let commentCardBody = document.createElement("div");
        // commentCardBody.classList = "card-body bg-secondary text-light";
        // commentCardHolder.appendChild(commentCardBody);

        // //put content holder element in card
        // let commentContentEl = document.createElement("ul");
        // commentContentEl.classList = "list-group list-group-flush";
        // commentCardBody.appendChild(commentContentEl);


        // let commentContentLi1 = document.createElement("li");
        // commentContentLi1.classList = "list-group-item bg-secondary";
        // commentContentEl.appendChild(commentContentLi1);

        let commentContent1 = document.createElement("div");
        commentContent1.classList = "card-header"
        commentContent1.textContent = "Created: " + dateCreated
        commentCardEl.appendChild(commentContent1);

        let commentDiv = document.createElement("div");
        commentDiv.classList = "card-body"
        commentCardEl.appendChild(commentDiv);

        let commentBlock = document.createElement("blockquote");
        commentDiv.classList = "blockquote mb-0"
        commentDiv.appendChild(commentBlock);

        let commentContent = document.createElement("p");
        commentContent.textContent = commentText
        commentBlock.appendChild(commentContent);

        // let commentContentLi2 = document.createElement("li");
        // commentContentLi2.classList = "list-group-item bg-secondary";
        // commentContentEl.appendChild(commentContentLi2);

        let commentTeacher = document.createElement("footer");
        commentTeacher.classList = "blockquote-footer";
        commentTeacher.textContent = "Teacher: " + teacherName
        commentBlock.appendChild(commentTeacher);

    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
document.getElementById("view-comments").addEventListener('click', viewComments);