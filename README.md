# tiptaptoe

One of my first exercises in javascript. Certain syntaxes might be redundant but I'm still proud of it as I tried to understand the logic all on my own 💪🏻


## 2023
Trying to update this Tip Tap Toe game I made in 2022. Holy jesus my eyes are bleeding.   

Removed the individual blocks' unique ids from the html and replace it with event listener `onclick="clicked(index)` to make the code more dynamic.   

```html
<table id="board">
        <tr>
            <td class="notop noleft neonText" onclick="clicked(0)"></td>
            <td class="notop neonText" onclick="clicked(1)"></td>
            <td class="notop noright neonText" onclick="clicked(2)"></td>
        </tr>

        <tr>
            <td class="noleft neonText" onclick="clicked(3)"></td>
            <td class="neonText" onclick="clicked(4)"></td>
            <td class="noright neonText" onclick="clicked(5)"></td>
        </tr>

        <tr>
            <td class="noleft nobot neonText" onclick="clicked(6)"></td>
            <td class="nobot neonText" onclick="clicked(7)"></td>
            <td class="noright nobot neonText" onclick="clicked(8)"></td>
        </tr>
    </table>
```