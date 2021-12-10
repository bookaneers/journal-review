
// ---------- FUNCTION TO DISPLAY ITEMS ----------

// function to display entry
function newItem(entry) {
  // create a new li = listed-item
  const $listedItem = document.createElement('li');
  $listedItem.setAttribute('class', 'listed-item');

  // create a new div = row
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  // create a new div = column-half
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');

  // create a new div = column-half
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');

  // create a new div = display-url
  const $displayUrl = document.createElement('div');
  $displayUrl.setAttribute('class', 'display-url');

  // create a new div = display-text
  const $displayText1 = document.createElement('div');
  $displayText1.setAttribute('class', 'display-text');

  // create another div = display-text
  const $displayText2 = document.createElement('div');
  $displayText2.setAttribute('class', 'display-text');

  // create a new image tag
  const $image = document.createElement('img');
  $image.setAttribute('src', entry.photoURL);

  // create a new h3 tag
  const $displayTitle = document.createElement('h3');
  $displayTitle.textContent = entry.title;

  // create another image tag
  const $icon = document.createElement('img');
  // $icon.setAttribute('class', 'pen');
  $icon.setAttribute('src', 'images/edit-icon.png');
  $icon.setAttribute('class', 'pen');
  // DATA-ID
  $icon.setAttribute('data-id', entry.entryId);

  // create a p tag
  const $displayNotes = document.createElement('p');
  $displayNotes.textContent = entry.notes;

  // append everything together to listedItem
  $listedItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($displayUrl);
  $displayUrl.appendChild($image);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($displayText1);
  $displayText1.appendChild($displayTitle);
  $displayTitle.appendChild($icon);
  $columnHalf2.appendChild($displayText2);
  $displayText2.appendChild($displayNotes);

  // return listedItem
  return $listedItem;
}

// ---------- CHANGING VIEWS ----------

// querying the NEW (entry) button
const $newEntry = document.querySelector('#new-entry');
// change view to NEW entry
$newEntry.addEventListener('click', function (event) {
  $entryForm.className = 'view';
  $entries.className = 'view hidden';

  // add message NEW ENTRY in the bar action
  const $h2 = document.querySelector('h2');
  $h2.textContent = 'New Entry';
});

// querying the ENTRIES link in the navigation bar
const $entriesView = document.querySelector('#entries-view');
// change view to ENTRIES
$entriesView.addEventListener('click', function (event) {
  $entries.className = 'view';
  $entryForm.className = 'view hidden';
});

// ---------- (SUBMIT) ADDING OR REPLACING AN ENTRY ----------

// query the entire form
const $contactForm = document.querySelector('#contact-form');

// function to add or replace an entry to the database
$contactForm.addEventListener('submit', function (event) {

  // The preventDefault() method of the Event interface tells
  // the user agent that if the event does not get explicitly
  // handled, its default action should not be taken as it
  // normally would be.
  event.preventDefault();

  // ---------- ADDING AN ENTRY ----------

  // if data.editing is null, it must add the item
  if (data.editing === null) {
    // create a temporary object
    const entry = {
      title: $contactForm.elements.title.value,
      photoURL: $contactForm.elements['photo-url'].value,
      notes: $contactForm.elements.notes.value,
      entryId: data.nextEntryId
    };

    // add object to array (database)
    data.entries.unshift(entry);

    // call newEntry function with the entry parameter and
    // store it in a variable
    const $item = newItem(entry);

    // add item to list of items
    $uList.prepend($item);

    // increment next entry id
    data.nextEntryId++;

    // reset form
    document.getElementById('contact-form').reset();
    // set image in the form
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  } else {

    // ---------- REPLACING AN ENTRY ----------

    // create a temporary object
    const $updatedEntry = {
      title: $contactForm.elements.title.value,
      photoURL: $contactForm.elements['photo-url'].value,
      notes: $contactForm.elements.notes.value,
      entryId: data.editing.entryId
    };

    // make $id equals to $updatedEntry to compare with database entries
    const $id = $updatedEntry.entryId;

    // iterate over database until it finds the correct item
    for (let i = 0; i < data.entries.length; i++) {

      // if item is located them replace item with new info
      if ($id === data.entries[i].entryId) {
        data.entries.splice(i, 1, $updatedEntry);
      }
    }

    // querying the ul
    const $entriesListUpdated = document.querySelector('ul');
    $entriesListUpdated.innerHTML = '';

    for (let i = 0; i < data.entries.length; i++) {
      // call function to display entry
      var $item = newItem(data.entries[i]);
      // append entry to UL
      $entriesListUpdated.appendChild($item);
    }

    // reset data.editing
    data.editing = null;

    // reset form
    document.getElementById('contact-form').reset();
    // set image in the form
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }

  // switching views
  $entries.className = 'view';
  $entryForm.className = 'view hidden';
});

// ---------- DISPLAY ITEM TO BE EDITED ----------
// querying ul (list) for all the items
const $entriesList = document.querySelector('.entries-list');

// querying to change views
const $entryForm = document.querySelector('#entry-form');
const $entries = document.querySelector('#entries');

$entriesList.addEventListener('click', function (event) {
  console.log(event.target.className)
  // return nothing if user did not click on the pen
  if (event.target.className !== 'pen') {
    return;
  }

  // switching views
  $entryForm.className = 'view';
  $entries.className = 'view hidden';

  // switch message and bar action
  const $h2 = document.querySelector('h2');
  $h2.textContent = 'Edit Entry';

  // querying the data-id for the item to be edited
  const $entryNumber = event.target.getAttribute('data-id');
  const $number = parseInt($entryNumber);

  // iterate over the database until you find the correct item
  for (let i = 0; i < data.entries.length; i++) {
    if ($number === data.entries[i].entryId) {
      $image.setAttribute('src', data.entries[i].photoURL);
      $contactForm.elements.title.value = data.entries[i].title;
      $contactForm.elements['photo-url'].value = data.entries[i].photoURL;
      $contactForm.elements.notes.value = data.entries[i].notes;
      // make sure entry already exit
      data.editing = data.entries[i];
    }
  }
});


// ---------- TO DISPLAY ENTRIES ----------

// querying the DOM for displying entries
const $uList = document.querySelector('ul');

// iterate over the database to disply all the entries
for (let i = 0; i < data.entries.length; i++) {
  // call function to display entry
  var $item = newItem(data.entries[i]);
  // append entry to UL
  $uList.appendChild($item);
}

// ---------- TO ADD A PICTURE TO THE FORM ----------

// querying the placeholder
const $image = document.querySelector('img');
// querying URL for when the image is going top be
const $photoUrl = document.querySelector('#photo-url');

// function to add a picture to form
$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});
