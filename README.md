# Ratios

The easiest way to calculate proportions!

Let's say a recipe says to use 50g of flour per 750ml of milk, and you want to know how many mls of milk you'll need having 64g of flour, the math should look something like this:  

***50 : 750 = 64 : x*** (or, in a less european way to write it: ***50/750 = 64/x*** )

That eventually, running the math would result to:

***x = 750 x 64 / 50***

***x = 960***

**Ratios** does exactly that! just in a user friendly and "smooth" way. It also allows you to choose the precision (specifying the amount of decimals after the comma).
You can try and test the app [here](https://ratios.netlify.app/).

### Structure

The project runs on **React + TypeScript** and to style it I went **CSS Modules + SASS + SUIT CSS naming convention**, a solution that served me very well in the past years.

Any routing (as well as state-management) library was clearly unnecessary considering the very contained dimensions of this project.

I used **absolute paths** for imports (no other way to go IMO :p).

The choice of wrapping basically every value or function within a useMemo/useCallback hook is dictated by my past years of working in teams led by seniors that thought this was the only correct way, because "5 rerenders is always better than 10", but I really think that in some cases the constant dependency check makes the app actually slower (imagine having a loooong list of deps for an overall easy function to re-declare at each rerender).
