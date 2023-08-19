<script lang="ts">
  import { cartItems, addToCart, removeFromCart } from "./cart";

  const products = [
    {
      id: 1,
      name: "Dog",
      price: 14.99,
    },
    {
      id: 2,
      name: "Cat",
      price: 14.99,
    },
    {
      id: 3,
      name: "Fish",
      price: 14.99,
    },
  ];

  async function checkout() {
    const data = await fetch("/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: $cartItems,
      }),
    }).then((data) => data.json());
    window.location.replace(data.url);
  }
</script>

<main>
  <h1>Products</h1>

  <div class="grid">
    {#each products as product}
      <div>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <button on:click={() => addToCart(product)}>Add to cart</button>
      </div>
    {/each}
  </div>

  {#if $cartItems.length > 0}
    <h1>Cart</h1>

    <div class="grid">
      {#each $cartItems as cartItem}
        <div>
          <h2>{cartItem.name}</h2>
          <p>Amount: {cartItem.amount}</p>
          <p>Price: ${cartItem.price}</p>
          <p>Total: ${cartItem.price * cartItem.amount}</p>
          <button on:click={() => removeFromCart(cartItem.id)}
            >Remove from cart</button
          >
        </div>
      {/each}
    </div>
  {/if}

  <button on:click={checkout}>Checkout</button>
</main>

<style>
  main {
    margin: 0 auto;
    max-width: 54em;
  }

  .grid {
    display: grid;
    grid-gap: 1em;
    margin-bottom: 5em;
    grid-template-columns: repeat(3, 1fr);
  }

  h1 {
    padding-bottom: 0.5em;
    border-bottom: 2px dotted black;
  }

  button {
    width: 100%;
    padding: 0.5em 1em;
  }
</style>
