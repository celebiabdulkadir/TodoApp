export default function PasswordComp() {
  return (
    <>
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        type="password"
        required
        autoComplete="true"
        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Password"
      />
    </>
  );
}
