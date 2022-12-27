export default function EmailComp() {
  return (
    <>
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        required
        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder="Email address"
      />
    </>
  );
}
