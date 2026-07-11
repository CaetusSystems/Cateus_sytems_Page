export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-[10px] font-bold">C</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Caetus Systems
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Sua operação digital funcionando todos os dias.
        </p>
      </div>
    </footer>
  );
}
