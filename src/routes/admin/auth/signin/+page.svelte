<script>
	import { applyAction, enhance } from '$app/forms';
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				alert(result.data?.message);
			} else {
				await applyAction(result);
			}
		};
	}}
>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>Login</button>
</form>
