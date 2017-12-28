console.log('app.js is working!')	

$(document).ready(function() {


  $("#addTalent").on("submit", function(e){
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "/api/talents",
      data: $(this).serialize(),
      success: function create(){
        $('#talent_list').text("")
        $.ajax({
          method: "GET",
          url: "/api/talents",
          success: handleGetSuccess,
          error: handleError
        });
      },
      error: handleError
    })
  })

// GET REQUEST FROM DATABASE
  $.ajax({
    method: "GET",
    url: "/api/talents",
    success: handleGetSuccess,
    error: handleError
  });

  function handleGetSuccess(talents) {
    console.log(talents)
    talents.forEach(function(talent) {
      $('#talent_list').append(`
        <div class="talent_object" id="${talent._id}">
          <div>
            <h4>Check out their talents</h4>
               <p>${talent.name}<p>
              <p>${talent.description}</p>
          </div>

          <button type="button" class="deleteBtn btn btn-primary" >Add Talent</button>
        </div>
        </div>
      `);
      });

  }

  function handleError(a,b,c) {
    console.log(`There was an error:${b}     ${a}   ${c}`);
  }

  $("#talent_list").on("click", ".deleteBtn", function(e){
    console.log($(this).parent().attr('id'))
    var id = $(this).parent().attr('id');

    $.ajax({
    method: "DELETE",
    url: `/api/talent/${id}`,
    success: handleDeleteSuccess,
    error: handleError
    });
  })
    

  function handleDeleteSuccess(json){
    console.log(json)
    $(`#${json._id}`).remove()

  }


// SUBMIT BUTTON FOR CREATING NEW USER
  $('#user-form form').on('submit', function(event) {
    event.preventDefault();
    var newUser = $(this).serialize();

    $.ajax({
      method: "POST",
      url: '/api/users',
      data: newUser,
      success: onCreateSuccess,
      error: handleError
    });
  });

  function onCreateSuccess(createdUser) {

      var arrayOfTalentDivs = createdUser.talents.map(function(createdTalent) {
        return `<div class="card">
          <p>${createdTalent.name}</p>
          <p>${createdTalent.description}</p>
          <img src="${createdTalent.image}"/>
        </div>`;
      });

      $('#users').prepend(`
        <div class="panel" data-id="${createdUser._id}">
          <button name="button"  type="button" class="delete-user btn btn-danger pull-right" data-id=${createdUser._id}>Delete</button>
            <h4>Meet this talented person</h4>
          <p>${createdUser.name}</p>
          <p>${createdUser.email}</p>
          <p>${createdUser.location}</p>
          <div>
            <h4>Check out their talents</h4>
            ${ arrayOfTalentDivs.join('') }
          </div>

          <div>
          <!-- Button trigger modal: Add Talent -->
          <button type="button" class="btn btn-primary" data-toggle="modal"data-target="#addTalentButton">Add Talent</button>
          </div>
        </div>`
      )
    };


// DELETE BUTTON USER PROFILE
  $('.container').on('click', '.delete-user', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/users/'+$(this).attr('data-id'),
      success: deleteUserSuccess,
      error: handleError
    });
  });

  function deleteUserSuccess(userDeletedInDb) {
    // find the user ID i want to delete
    let userIdToDelete = userDeletedInDb._id;

    // find the div with that same ID on the page
    let $userDivToDelete = $(`.panel[data-id=${userIdToDelete}]`);

    // write jquery to remove that div
    $userDivToDelete.remove();
  }

// EDIT BUTTON FOR USER 
  $('.container').on('submit', '.edit-user', function(event) {
    event.preventDefault();
    var updateUser = $(this).serialize();
    $.ajax({
      method: 'PUT',
      url: '/api/users/'+ $(this).attr('data-id'),
      data: updateUser,
      success: updateUserSuccess,
      error: handleError
    });
  });
 
  function updateUserSuccess(userEditInDb){
     console.log('response to update', userEditInDb);
     location.reload();
  }





});
