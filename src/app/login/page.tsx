import LoginForm from './LoginForm';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2">
      <LoginForm />
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
