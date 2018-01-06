/* Copyrights Rogliano Antoine
_ by Rogliano Antoine aka Inateno

regroupe les fonctions permettant de trouver la position  d'une souris

_scrollPosition récupère la position du scroll sur la map

_getCoords nécessite e passé depuis une action de souris
elem est l'élément canvas
et scroller est optionnel, c'est par exemple la div qui contient le canvas
*/
function scrollPosition(e)
{
	return {
		x: document.scrollLeft || window.pageXOffset,
		y: document.scrollTop || window.pageYOffset
	};
}

function getCoords(e, elem, scroller, offset)
{
	// si on veut calculer avec le offset du scroller
	if (offset && offset == true)
	{
		return {
				x: (e.clientX - (scroller.offsetLeft + elem.offsetLeft) + scrollPosition().x) / RATIO_WIDTH,
				y: (e.clientY - (scroller.offsetTop + elem.offsetTop) + scrollPosition().y) / RATIO_HEIGHT
			}
	}
	else
	{
		if (!scroller)
		{
			return {
				x: (e.clientX - (elem.offsetLeft) + scrollPosition().x) / RATIO_WIDTH,
				y: (e.clientY - (elem.offsetTop) + scrollPosition().y) / RATIO_HEIGHT
			}
		}
		else
		{
			return {
				x: e.clientX - (elem.offsetLeft)- scroller.offsetLeft + scrollPosition().x + scroller.scrollLeft,
				y: e.clientY - (elem.offsetTop) - scroller.offsetTop + scrollPosition().y + scroller.scrollTop
			}
		}
	}
}