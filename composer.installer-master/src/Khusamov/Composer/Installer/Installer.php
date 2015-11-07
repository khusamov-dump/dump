<?php

namespace Khusamov\Composer\Installer;

use Composer\Package\PackageInterface;
use Composer\Installer\LibraryInstaller;

class Installer extends LibraryInstaller
{
    
    /**
     * {@inheritDoc}
     */
    public function getInstallPath(PackageInterface $package)
    {
        $extra = $package->getExtra();
        if (array_key_exists("install-path", $extra)) {
            return $extra["install-path"];
        } else {
            return parent::getInstallPath($package);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function supports($packageType)
    {
        return 'khusamov-library' === $packageType;
    }
}
