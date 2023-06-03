# Taken from http://mirrors.ctan.org/support/latexmk/example_rcfiles/glossaries_latexmkrc

add_cus_dep( 'acn', 'acr', 0, 'makeglossaries' );
add_cus_dep( 'glo', 'gls', 0, 'makeglossaries' );
$clean_ext .= " acr acn alg glo gls glg bbl ist";

sub makeglossaries {
    my ($base_name, $path) = fileparse( $_[0] );
    my @args = ( "-q", "-d", $path, $base_name );
    if ($silent) { unshift @args, "-q"; }
    return system "makeglossaries", "-d", $path, $base_name;
}

# Compile a PDF
$pdf_mode = 1;

# Put auxiliary files in build directory
$aux_dir = 'build';

# Use the latexmk -cd option by default
$do_cd = 1;

# Don't prompt for user interaction on errors and use synctex
$pdflatex = 'pdflatex --interaction=nonstopmode --synctex=1 --shell-escape %O %S';

# Define a subroutine to reduce PDF size
sub reduce_pdf_size {
    my ($input_file) = @_;
    my $output_file = "compressed.pdf";
    system("gswin64 -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dNOPAUSE -dQUIET -dBATCH -dPrinted=false -sOutputFile=$output_file $input_file");
    rename($output_file, $input_file);
}

# Call the reduce_pdf_size subroutine after the PDF is compiled
add_cus_dep( 'pdf', 'pdf', 0, 'reduce_pdf_size' );

# Subroutine to call reduce_pdf_size
sub reduce_pdf_size {
    my ($input_file, $output_file, $file, $cleanup) = @_;

    reduce_pdf_size("$aux_dir/$file");  # Compress the PDF

    return 0;
}
