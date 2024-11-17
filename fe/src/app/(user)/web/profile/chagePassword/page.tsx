 
 

const Page = ({}) => {
  return (
    <main className="p-5 bg-white rounded-xl">
      <header className="mb-6 text-lg capitalize">Change Password</header>
      <form action="">
        <fieldset className="space-y-4">
          <legend className="sr-only">Change your password</legend> {/* Untuk aksesibilitas */}
          
          <div className="flex flex-col w-2/3 gap-2">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"   
              className="p-2 font-normal border border-black rounded"
              id="newPassword"
              placeholder="New Password"
              aria-label="Enter your new password"
            />
          </div>
          
          <div className="flex flex-col w-2/3 gap-2">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"   
              className="p-2 font-normal border border-black rounded"
              id="confirmPassword"
              placeholder="Confirm New Password"
              aria-label="Confirm your new password"
            />
          </div>
          
          <div className="flex justify-end w-2/3 py-4">
            <input
              type="submit"
              value="Submit"
              className="px-3 py-2 font-normal text-white capitalize rounded bg-customBlue"
              aria-label="Submit password change"
            />
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default Page;
