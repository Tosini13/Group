<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAZA GRUPOWA</title>
    <link href="css/fontello/css/lato.css" type="text/css" rel="stylesheet">
    <link href="css/group.css" type="text/css" rel="stylesheet">
</head>

<body>
    <section id='formCreation'>
        <label for='name'>Nazwa turnieju</label>
        <input class="text" type="text" name="name" placeholder="nazwa turnieju">
        <h2 class='mobileWholeWidth'>FAZA GRUPOWA</h2>
        <label for='no_teams'>Liczba drużyn</label>
        <!-- <select class="number" name="no_teams">
            <?php
            for ($i = 2; $i < 97; $i++) {
                echo "<option value='" . $i . "'>" . $i . "</option>";
            }
            ?>
        </select> -->
        <input class="number" type="number" name="no_teams" min='2' max='99' value="2">
        <label for='no_groups'>Ilość grup</label>
        <select class="number" name="no_groups">
            <option value="1">1</option>
            <?php
            for ($i = 2; $i < 17; $i *= 2) {
                echo "<option value='" . $i . "'>" . $i . "</option>";
            }
            ?>
        </select>
        <label for='revange_group'>Rewanże</label>
        <input type="checkbox" name="revange_group">
        <label for='win_points'>Punkty za wygraną</label>
        <input class="number" type="number" name="win_points" min='1' max='100' value="3">
        <label for='draw_points'>Punkty za remis</label>
        <input class="number" type="text" name="draw_points" min='1' max='100' value="1">

        <h2 class='mobileWholeWidth'>FAZA PUCHAROWA*<br><span style='font-size: 10px'>*(tymczasowe - tylko ilość meczów w pierwszej rundzie do awansów z grupy)</span></h2>
        <label class='mobileWholeWidth' for='play_offs'>Tryb fazy pucharowej</label>
        <select class='mobileWholeWidth' name='play_offs'>
            <option value="1">Finał</option>
            <option value="2">Finał, Półfinały</option>
            <option value="4">Finał, Półfinały, Ćwierćfinały</option>
            <option value="8">Finał, Półfinały, Ćwierćfinały, 1/16</option>
            <option value="16">Finał, Półfinały, Ćwierćfinały, 1/16, 1/32</option>
        </select>
        <a class="button mobileWholeWidth" href='#' onclick="createGroup()">Dalej</a>
    </section>

    <section id='dashboardGroups'>
        <!-- GIVE RIGHTS: EDIT - ALLOWS TO EDIT MATCHES/SCORE/TEAMS; OTHERS NO -->
    </section>


    <script src="js/structure.js" type='text/javascript'></script>
    <script src="js/group.js" type='text/javascript'></script>
    <script>
        $(document).ready(function() {
            changeIcon();
        });
    </script>
    <!-- JavaScript -->
    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
    <!-- JSX -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Load our React component. -->
    <script src="js/my_react.js" type='text/babel'></script>
</body>

</html>